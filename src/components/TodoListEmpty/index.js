import { BaseComponent } from '@symbiotejs/symbiote';

import template from './template.html';
import styles from './styles.css'; // eslint-disable-line no-unused-vars

class TodoListEmpty extends BaseComponent {}

TodoListEmpty.template = template;
TodoListEmpty.reg('todo-list-empty');

export default TodoListEmpty;
