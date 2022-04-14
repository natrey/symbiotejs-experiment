import { BaseComponent, Data } from '@symbiotejs/symbiote';

import template from './template.html';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class TodoListProgressBar extends BaseComponent {
  init$ = {
    checkedItems: 0,
  };

  initCallback() {
    const ctx = Data.getNamedCtx('todo-list');
    ctx.sub('items', (items) => {
      this.$.checkedItems = items.filter(i => i.checked).length;
      this.ref.progress.style.width = `${Math.floor((this.$.checkedItems / items.length) * 1e2)}%`;
    });
  }
}

TodoListProgressBar.template = template;
TodoListProgressBar.reg('todo-list-progress-bar');

export default TodoListProgressBar;
