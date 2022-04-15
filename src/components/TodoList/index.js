import { BaseComponent, Data, applyAttributes } from '@symbiotejs/symbiote';
import { formatDate } from '@funboxteam/chronos';
import { LS_TODO_LIST } from '../../constants';

import TodoListHeading from '../TodoListHeading';
import TodoListEmpty from '../TodoListEmpty';
import TodoListProgressBar from '../TodoListProgressBar';
import TodoItem from '../TodoItem';

import template from './template.html';
import styles from './styles.css';

const lSData = localStorage.getItem(LS_TODO_LIST);

Data.registerNamedCtx('todo-list', {
  count: JSON.parse(lSData)?.length || 0,
  items: JSON.parse(lSData) || [],
});

class TodoList extends BaseComponent {
  get items() {
    return [...this.ref.list_wrapper.children];
  }

  init$ = {
    addItem: () => {
      const timestamp = Date.now();
      const data = {
        createdAt: timestamp,
        date: formatDate(timestamp, 'D.MM, HH:mm:ss'),
        checked: false,
        text: '',
      };
      this.ref.list_wrapper.appendChild(new TodoItem(data));

      const ctx = Data.getNamedCtx('todo-list');
      ctx.pub('items', [...ctx.read('items'), data]);
      ctx.pub('count', ctx.read('items').length);
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
    sortItemsByStatus: () => {
      const sortedItems = [...this.ref.list_wrapper.children]
        .sort((a, b) => {
          const checkboxA = a.querySelector('input[type=checkbox]:checked');
          const checkboxB = b.querySelector('input[type=checkbox]:checked');

          if (checkboxA && !checkboxB) return 1;
          if (!checkboxA && checkboxB) return -1;
          return 0;
        });
      this.$.updateChildren(sortedItems);
    },
    sortItemsByDate: () => {
      const sortedItems = [...this.ref.list_wrapper.children]
        .sort((a, b) => {
          const dateA = a.querySelector('[data=date]').getAttribute('id');
          const dateB = b.querySelector('[data=date]').getAttribute('id');

          return dateA > dateB ? 1 : -1;
        });
      this.$.updateChildren(sortedItems);
    },
    updateChildren: (children) => {
      this.ref.list_wrapper.replaceChildren(...children);
    },
  };

  initCallback() {
    const ctx = Data.getNamedCtx('todo-list');
    if (!ctx.read('items').length) {
      this.$.addItem();
    } else {
      ctx.read('items').forEach(i => {
        this.ref.list_wrapper.appendChild(new TodoItem(i));
      });
    }

    ctx.sub('items', (items) => {
      localStorage.setItem(LS_TODO_LIST, JSON.stringify(items));

      const {
        todoListSorting,
        todoListProgressBar,
        todoListEmpty,
        clearCheckedButton,
        removeCheckedButton,
      } = this.ref;

      if (items.some(i => i.checked)) {
        applyAttributes(clearCheckedButton, { disabled: false });
        applyAttributes(removeCheckedButton, { disabled: false });
      } else {
        applyAttributes(clearCheckedButton, { disabled: true });
        applyAttributes(removeCheckedButton, { disabled: true });
      }

      if (!items.length) {
        applyAttributes(todoListEmpty, { hidden: false });
        applyAttributes(todoListProgressBar, { hidden: true });
        applyAttributes(todoListSorting, { hidden: true });
      } else {
        applyAttributes(todoListEmpty, { hidden: true });
        applyAttributes(todoListProgressBar, { hidden: false });
        applyAttributes(todoListSorting, { hidden: false });
      }
    });
  }
}

TodoList.template = template;
TodoList.reg('todo-list');

export default TodoList;
