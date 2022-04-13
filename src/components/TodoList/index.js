import { BaseComponent } from '@symbiotejs/symbiote';
import TodoItem from '../TodoItem';
import TodoListHeading from '../TodoListHeading'; // eslint-disable-line no-unused-vars
import template from './template.html';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

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
  }
}

TodoList.template = template;
TodoList.reg('todo-list');

export default TodoList;
