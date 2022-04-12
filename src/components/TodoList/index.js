import { BaseComponent } from '@symbiotejs/symbiote';
import TodoItem from '../TodoItem';
import template from './template.html';
import { TODO_LIST_HEADING } from '../../constants';

class TodoList extends BaseComponent {
  get items() {
    return [...this.ref.list_wrapper.children];
  }

  init$ = {
    heading: TODO_LIST_HEADING,
    editHeading: () => {
      this.ref.heading.setAttribute('hidden', 'hidden');
      this.ref.input.removeAttribute('hidden');

      this.ref.input.focus();
    },
    handleBlur: (e) => {
      this.$.heading = e.target.value;

      this.ref.heading.removeAttribute('hidden');
      this.ref.input.setAttribute('hidden', 'hidden');
    },
    addItem: () => {
      this.ref.list_wrapper.appendChild(new TodoItem());
    },
    clearChecked: () => {
      this.items.forEach((item) => {
        if (item.checked) {
          item.clear();
        }
      });
    },
    removeChecked: () => {
      this.items.forEach((item) => {
        if (item.checked) {
          item.remove();
        }
      });
    },
  };

  initCallback() {
    // Add first item:
    this.$.addItem();

    this.sub('heading', (val) => {
      if (!val) {
        this.$.heading = TODO_LIST_HEADING;
      }
    });
  }
}

TodoList.template = /* html */ template;
TodoList.reg('todo-list');

export default TodoList;
