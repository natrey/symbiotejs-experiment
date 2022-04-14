import { BaseComponent, Data } from '@symbiotejs/symbiote';
import { formatDate } from '@funboxteam/chronos';
import { LS_TODO_LIST } from '../../constants';

import TodoListHeading from '../TodoListHeading'; // eslint-disable-line no-unused-vars
import TodoListEmpty from '../TodoListEmpty'; // eslint-disable-line no-unused-vars
import TodoListProgressBar from '../TodoListProgressBar'; // eslint-disable-line no-unused-vars
import TodoItem from '../TodoItem';

import template from './template.html';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

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
      if (items.some(i => i.checked)) {
        this.ref.clearCheckedButton.removeAttribute('disabled');
        this.ref.removeCheckedButton.removeAttribute('disabled');
      } else {
        this.ref.clearCheckedButton.setAttribute('disabled', true);
        this.ref.removeCheckedButton.setAttribute('disabled', true);
      }

      if (!items.length) {
        this.ref.todoListEmpty.removeAttribute('hidden');
        this.ref.todoListProgressBar.setAttribute('hidden', 'hidden');
        this.ref.todoListSorting.setAttribute('hidden', 'hidden');
      } else {
        if (!this.ref.todoListEmpty.hasAttribute('hidden')) {
          this.ref.todoListEmpty.setAttribute('hidden', 'hidden');
        }
        if (this.ref.todoListProgressBar.hasAttribute('hidden')) {
          this.ref.todoListProgressBar.removeAttribute('hidden');
        }
        if (this.ref.todoListSorting.hasAttribute('hidden')) {
          this.ref.todoListSorting.removeAttribute('hidden');
        }
      }
    });
  }
}

TodoList.template = template;
TodoList.reg('todo-list');

export default TodoList;
