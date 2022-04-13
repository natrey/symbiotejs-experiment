import { BaseComponent, Data } from '@symbiotejs/symbiote';
import { formatDate } from '@funboxteam/chronos';

import template from './template.html';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class TodoItem extends BaseComponent {
  init$ = {
    text: '',
    createdAt: Date.now(),
    date: formatDate(Date.now(), 'D.MM, HH:mm:ss'),
    remove: () => {
      this.remove();
    },
    handleChange: (e) => {
      const ctx = Data.getNamedCtx('todo-list');
      ctx.pub('items', ctx.read('items').map(i => ({
        ...i,
        checked: i.createdAt === this.$.createdAt ? e.target.checked : i.checked,
      })));
    },
  };

  get checked() {
    return this.ref.checkbox.checked;
  }

  get data() {
    return {
      checked: false,
      date: this.$.date,
      createdAt: this.$.createdAt,
    };
  }

  clear = () => {
    this.$.text = '';
  };

  initCallback() {
    this.ref.edit.focus();

    const ctx = Data.getNamedCtx('todo-list');
    ctx.pub('items', [...ctx.read('items'), this.data]);
    ctx.pub('count', ctx.read('items').length);
  }

  disconnectedCallback() {
    const ctx = Data.getNamedCtx('todo-list');
    ctx.pub('items', ctx.read('items').filter(i => i.createdAt !== this.$.createdAt));
    ctx.pub('count', ctx.read('count') - 1);
  }
}

TodoItem.template = template;

TodoItem.reg('todo-item');

export default TodoItem;
