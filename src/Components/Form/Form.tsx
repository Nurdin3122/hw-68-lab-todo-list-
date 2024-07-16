import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store.ts";
import {addTasks, FetchTasks} from "../../slice.ts";

interface TaskMutation {
    title: string;
}

const Form = () => {
    const dispatch: AppDispatch = useDispatch();
    const [newTask, setNewTask] = useState<TaskMutation>({
        title:"",
    });
    const tasks = useSelector((state:RootState) => state.todoList.tasks)
    const loading = useSelector((state:RootState) => state.todoList.loading)
    console.log(newTask)


    useEffect(() => {
        dispatch(FetchTasks());
    }, [dispatch]);

    const onFormSubmit =  async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(addTasks(newTask));
    }

    const changeTask = (  event: React.ChangeEvent<HTMLInputElement >) => {
        setNewTask((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    return (
        <div className="container-fluid">
            <form onSubmit={onFormSubmit}>
                <div className="form-text mt-1">
                    writing something
                </div>

                <input className="form-control mt-4"
                       type="text"
                       name="title"
                       id="title"
                       placeholder="you can write here"
                       aria-label="default input example"
                       required
                       onChange={changeTask}
                       value={newTask.title}
                />
                {loading ? "loading" :
                    <button type="submit" className="btn btn-success mt-3 d-flex ms-auto">
                    Save
                    </button>}
            </form>

            <div className="container-fluid">
                {tasks.map((task) => (
                    <div key={task.id} className="card mt-4">
                       <div className="card-body">
                           <p  className="card-title">{task.text.title}</p>
                       </div>
                   </div>
                ))}
            </div>
        </div>
    );
};

export default Form;