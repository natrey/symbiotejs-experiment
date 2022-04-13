import { BaseComponent } from '@symbiotejs/symbiote';
import { TODO_LIST_HEADING } from '../../constants';
import template from './template.html';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class TodoListHeading extends BaseComponent {
  init$ = {
    heading: TODO_LIST_HEADING,
    editHeading: () => {
      this.ref.heading.classList.add('heading_hidden');
      this.ref.input.removeAttribute('hidden');
      this.ref.editHeadingButton.setAttribute('disabled', true);

      this.ref.input.focus();
    },
    handleBlur: (e) => {
      this.$.heading = e.target.value;

      this.ref.heading.classList.remove('heading_hidden');
      this.ref.input.setAttribute('hidden', 'hidden');
      this.ref.editHeadingButton.removeAttribute('disabled');
    },
  };

  initCallback() {
    this.sub('heading', (val) => {
      if (!val) {
        this.$.heading = 'Empty heading';
      }
    });
  }
}

TodoListHeading.template = template;
TodoListHeading.reg('todo-list-heading');

export default TodoListHeading;
