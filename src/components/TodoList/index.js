import { BaseComponent, Data } from '@symbiotejs/symbiote';

import TodoListHeading from '../TodoListHeading'; // eslint-disable-line no-unused-vars
import TodoListEmpty from '../TodoListEmpty'; // eslint-disable-line no-unused-vars
import TodoItem from '../TodoItem';

import template from './template.html';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

Data.registerNamedCtx('todo-list', {
  count: 0,
  items: [],
});

class TodoList extends BaseComponent {
  get items() {
    return [...this.ref.list_wrapper.children];
  }

  init$ = {
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
    this.$.addItem();

    const ctx = Data.getNamedCtx('todo-list');
    ctx.sub('items', (items) => {
      if (items.some(i => i.checked)) {
        this.ref.clearCheckedButton.removeAttribute('disabled');
        this.ref.removeCheckedButton.removeAttribute('disabled');
      } else {
        this.ref.clearCheckedButton.setAttribute('disabled', true);
        this.ref.removeCheckedButton.setAttribute('disabled', true);
      }

      if (!items.length) {
        this.ref.todoListEmpty.removeAttribute('hidden');
      } else if (!this.ref.todoListEmpty.hasAttribute('hidden')) {
        this.ref.todoListEmpty.setAttribute('hidden', 'hidden');
      }
    });
  }
}

TodoList.template = template;
TodoList.reg('todo-list');

export default TodoList;
