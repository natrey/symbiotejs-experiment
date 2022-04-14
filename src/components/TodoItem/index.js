import { BaseComponent, Data } from '@symbiotejs/symbiote';

import template from './template.html';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class TodoItem extends BaseComponent {
  constructor(props) {
    super(props);

    this.createdAt = props?.createdAt;
    this.date = props?.date;
    this.checkedProp = props?.checked;
  }

  init$ = {
    text: '',
    createdAt: null,
    date: null,
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
    if (this.createdAt) this.$.createdAt = this.createdAt;
    if (this.date) this.$.date = this.date;
    if (this.checkedProp) this.ref.checkbox.checked = this.checkedProp;

    this.ref.edit.focus();
  }

  destroyCallback() {
    const ctx = Data.getNamedCtx('todo-list');
    ctx.pub('items', ctx.read('items').filter(i => i.createdAt !== this.$.createdAt));
    ctx.pub('count', ctx.read('count') - 1);
  }
}

TodoItem.template = template;

TodoItem.reg('todo-item');

export default TodoItem;
