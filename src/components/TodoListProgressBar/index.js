import { BaseComponent, Data } from '@symbiotejs/symbiote';
import store from '../../store';

import template from './template.html';
import styles from './styles.css';

class TodoListProgressBar extends BaseComponent {
  init$ = {
    checkedItems: 0,
  };

  initCallback() {
    store.onItemsUpdate((items) => {
      this.$.checkedItems = items.filter(i => i.checked).length;
      this.ref.progress.style.width = `${Math.floor((this.$.checkedItems / items.length) * 1e2)}%`;
    });
  }
}

TodoListProgressBar.template = template;
TodoListProgressBar.reg('todo-list-progress-bar');

export default TodoListProgressBar;
