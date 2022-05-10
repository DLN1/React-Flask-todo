import React from 'react';
import './Todo.css';
import InputField from '../../components/input/InputField'
import TodoCard from '../../components/todo/TodoCard'
import backend from '../../services/backend.js'

class Todo extends React.Component {
    constructor() {
        super();
        this.state = { todo: { text: '', completed: false, id: null }, todos: [], filters: [{ name: "All", active: true }, { name: "Active", active: false }, { name: "Completed", active: false }], originalArray: [] }
    }
    handleChange = (e) => {
        this.setState({ todo: { text: e.target.value, completed: false } })
    }
    addTodo = async (e) => {
        if (e.key === 'Enter') {
            
            try {
                const res = (await backend.create_todo({ text: this.state.todo.text, completed: false })).data;
                this.setState({ todos: [...this.state.todos, res] });
            } catch (e) {
                console.log(e)
            } finally {
                e.target.value = ''
            }
        }
    }
    async completedClicked(id) {
        let items = [...this.state.todos]

        const elClicked = this.state.todos.findIndex(el => id === el.id)

        let item = { ...items[elClicked] }

        item.completed = !item.completed

        items[elClicked] = item;
        await backend.update_todo(id, item)
        this.setState({ todos: [...items] })
    }

    toggleFilter(filter) {
        let items = [...this.state.filters]
        let todos = [...this.state.todos]

        if (filter.name === 'Active') {
            todos = this.state.originalArray
            items[0].active = false
            items[1].active = true
            items[2].active = false
            todos = todos.filter((el) => !el.completed)
        } else if (filter.name === 'Completed') {
            todos = this.state.originalArray
            items[0].active = false
            items[1].active = false
            items[2].active = true
            todos = todos.filter((el) => el.completed)
        } else {
            items[0].active = true
            items[1].active = false
            items[2].active = false
            todos = this.state.originalArray
        }
        this.setState({ filters: [...items], todos: [...todos] })
    }

     clearCompleted = async () => {
            const response = (await backend.remove_todos()).data
            this.setState({todos: [...response]})
    }

    async componentDidMount() {
        const response = (await backend.get_todos()).data;
        this.setState({ todos: [...response] })
        this.setState({ originalArray: [...response] })
    }

    render() {
        return (
            <div className="todoContainer">
                <div className="todoHeader">
                </div>
                <div className="todoHeading">
                    <h1>Todo</h1>
                </div>
                <InputField value={ this.state.value } onChange={ this.handleChange } onKeyDown={ this.addTodo } placeholder="Create a new todo..." />
                <div className="todoWrapper">
                    { this.state.todos.map((todo, index) => (
                        <TodoCard key={ index } todo={ todo.text } id={ todo.id } completed={ todo.completed } completedClicked={ (todo) => this.completedClicked(todo) } />
                    )) }
                </div>
                <div className="card_footer">
                    <li>{ this.state.todos.filter(todo => !todo.completed).length } items left</li>
                    <div className="footer_middle_section">
                        { this.state.filters.map((filter, index) => (
                            <li onClick={ () => this.toggleFilter(filter) } className={ filter.active ? 'filter_active' : '' } key={ index }>
                                { filter.name }
                            </li>
                        )) }
                    </div>
                    <li><button onClick={ this.clearCompleted } className="clear_completed">Clear Completed</button></li>
                </div>
            </div>
        )
    }
}

export default Todo;