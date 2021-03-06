import { BaseComponent } from '@symbiotejs/symbiote';
import store from '../../store';

import template from './template.html';
import './styles.css';

class TodoItem extends BaseComponent {
  constructor(props) {
    super(props);

    this.createdAt = props?.createdAt;
    this.date = props?.date;
    this.checkedProp = props?.checked;
    this.text = props?.text;
  }

  init$ = {
    text: '',
    createdAt: null,
    date: null,
    remove: () => {
      this.remove();
    },
    handleChange: (e) => {
      store.updateItems(store.getItems().map(i => ({
        ...i,
        checked: i.createdAt === this.$.createdAt ? e.target.checked : i.checked,
      })));
    },
    handleBlur: (e) => {
      store.updateItems(store.getItems().map(i => ({
        ...i,
        text: i.createdAt === this.$.createdAt ? e.target.innerHTML : i.text,
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
    if (this.text) this.ref.edit.innerHTML = this.text;

    this.ref.edit.focus();
  }

  destroyCallback() {
    store.updateItems(store.getItems().filter(i => i.createdAt !== this.$.createdAt));
    store.updateCount(store.getCount() - 1);
  }
}

TodoItem.template = template;

TodoItem.reg('todo-item');

export default TodoItem;
