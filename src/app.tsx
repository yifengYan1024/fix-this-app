import NotesView from "./view";
import NotesAPI from "./api";
import LoadFile from "./loadFile";
import React, { Component } from "react";

export default class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    console.log(props);
    // this.notes = [];
    // this.activeNote = null;
    // this.view = new NotesView(root, this._handlers());

    // this._refreshNotes();
    this.state = {
      notes: [],
      view: null,
      activeNote: null,
      pageType: 1
    }
  }

  render() {
    return (
      // <NotesView></NotesView>
      <div>
        <div className="page-btn-box">
          <button className="btn" onClick={this._setPageType.bind(this, 1)} style={{backgroundColor:(this.state.pageType==1)?"#008CBA":"#4CAF50" }}>notes</button>
          <button className="btn" onClick={this._setPageType.bind(this, 2)} style={{backgroundColor:(this.state.pageType==2)?"#008CBA":"#4CAF50" }}>files</button>
        </div>
        <div id="page" className="node__page" style={{display:(this.state.pageType==1)?"flex":"none" }}></div>
        <div style={{display:(this.state.pageType==2)?"flex":"none" }}>
          <LoadFile></LoadFile>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      view: new NotesView(document.getElementById('page'), this._handlers())
    }, () => {
      this._refreshNotes();
    });
  }

  _refreshNotes() {
    const notes = NotesAPI.getAllNotes();

    this._setNotes(notes);

    if (notes.length > 0) {
      console.log(notes, notes[0]);
      this._setActiveNote(notes[0]);
    }
  }

  _setNotes(notes: any) {
    // this.notes = notes;
    this.setState({ notes }, () => {
      this.state.view.updateNoteList(notes);
      this.state.view.updateNotePreviewVisibility(notes.length > 0);
    });
  }

  _setActiveNote(note: any) {
    // this.activeNote = note;
    console.log(note);
    this.setState({ activeNote: note }, () => {
      this.state.view.updateActiveNote(note);
    });
  }

  _handlers() {
    return {
      onNoteSelect: (noteId:any) => {
        const selectedNote = this.state.notes.find((note: any) => note.id === noteId * 1);
        console.log(this.state.notes, noteId, selectedNote);
        if (selectedNote) {
          this._setActiveNote(selectedNote);
        }
      },
      onNoteAdd: () => {
        const newNote = {
          title: "新建笔记",
          body: "开始记录...",
        };

        NotesAPI.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (title: any, body:any) => {
        NotesAPI.saveNote({
          id: this.state.activeNote.id,
          title,
          body,
        });

        this._refreshNotes();
      },
      onNoteDelete: (noteId:any) => {
        NotesAPI.deleteNote(noteId);
        this._refreshNotes();
      },
    };
  }

  _setPageType(pageType:any) {
    this.setState({ pageType });
    console.log(this.state.pageType);
  }
}
