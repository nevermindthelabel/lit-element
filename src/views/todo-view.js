import { LitElement, html } from 'lit-element';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-checkbox';
import '@vaadin/vaadin-radio-button/vaadin-radio-button';
import '@vaadin/vaadin-radio-button/vaadin-radio-group';
import '@vaadin/vaadin-button';

const VisibilityFilters = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
}

class TodoView extends LitElement {

  static get properties() {
    return {
      todos: { type: Array },
      filter: { type: String },
      task: { type: String }
    }
  }

  constructor() {
    super();
    this.todos = [];
    this.filter = VisibilityFilters.SHOW_ALL;
    this.task = '';
  }

  render() {
    return html`
      <div class="input-layout" @keyup="${this.shortcutListener}">
      <vaadin-text-field
      placeholder="Task"
      value="${this.task}"
      @change="${this.updateTask}"
      ></vaadin-text-field>
      <vaadin-button
      theme="primary"
      @click="${this.addTodo}"
      >Add Todo</vaadin-button>
      </div>

      <div class="todos-list">
        ${this.todos.map(todo => html`
        <div class="todo-item">
        <vaadin-checkbox
        ?checked="${todo.complete}"
        @change="${e => this.updateTodoStatus(todo, e.target.checked)}"
        >${todo.task}</vaadin-checkbox>
        </div>
        `)}
      </div>
    `
  }

  updateTodoStatus(updatedTodo, complete) {
    this.todos = this.todos.map(todo => updatedTodo === todo ? { ...updatedTodo, complete } : todo);
  };

  shortcutListener(e) {
    if (e.key === 'Enter') {
      this.addTodo();
    };
  };

  updateTask(e) {
    this.task = e.target.value;
  };

  addTodo() {
    if (this.task) {
      this.todos = [...this.todos, {
        task: this.task,
        complete: false
      }];
      this.task = '';
    }
  }
}

customElements.define('todo-view', TodoView);
