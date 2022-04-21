import { BaseComponent } from '@symbiotejs/symbiote';
import { formatDate } from '@funboxteam/chronos';
import store from '../../store';

import TodoListHeading from '../TodoListHeading';
import TodoListEmpty from '../TodoListEmpty';
import TodoListProgressBar from '../TodoListProgressBar';
import TodoItem from '../TodoItem';

import template from './template.html';
import styles from './styles.css';

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

      store.updateItems([...store.getItems(), data]);
      store.updateCount(store.getItems().length);
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
          const dateA = a.querySelector('[data-date]').dataset.date;
          const dateB = b.querySelector('[data-date]').dataset.date;

          return dateA > dateB ? 1 : -1;
        });
      this.$.updateChildren(sortedItems);
    },
    updateChildren: (children) => {
      this.ref.list_wrapper.replaceChildren(...children);
    },
    isTodoListEmpty: !!store.getItems().length,
    isTodoListHidden: !store.getItems().length,
    isToolbarDisabled: true,
  };

  initCallback() {
    const ctxItems = store.getItems();
    if (!ctxItems.length) {
      this.$.addItem();
    } else {
      ctxItems.forEach(i => {
        this.ref.list_wrapper.appendChild(new TodoItem(i));
      });
    }
    store.onItemsUpdate((items) => {
      this.$.isToolbarDisabled = !items.some(i => i.checked);
      this.$.isTodoListEmpty = !!items.length;
      this.$.isTodoListHidden = !items.length;
    });
  }
}

TodoList.template = template;
TodoList.reg('todo-list');

export default TodoList;
