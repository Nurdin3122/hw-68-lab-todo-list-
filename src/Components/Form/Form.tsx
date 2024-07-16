import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store.ts";
import {addTasks, deleteTask, FetchTasks} from "../../slice.ts";

interface TaskMutation {
    title: string;
    completed:boolean;
}

const Form = () => {
    const dispatch: AppDispatch = useDispatch();
    const [newTask, setNewTask] = useState<TaskMutation>({
        title:"",
        completed:false,
    });
    const tasks = useSelector((state:RootState) => state.todoList.tasks)
    const loading = useSelector((state:RootState) => state.todoList.loading)


    useEffect(() => {
         dispatch(FetchTasks());
    }, [dispatch]);

    const onFormSubmit =  async (event: React.FormEvent) => {
        event.preventDefault();
        await dispatch(addTasks(newTask));
        await  dispatch(FetchTasks())
        setNewTask({title:"",completed:false})
    }

    const changeTask = (  event: React.ChangeEvent<HTMLInputElement >) => {
        setNewTask((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    };

    const Delete = (id:string) => {
        dispatch(deleteTask(id))
    }

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
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <div key={task.id} className="card mt-4">
                            <div className="card-body">
                                <p className="card-title">{task.text.title}</p>
                                {loading ? "Loading..." :
                                    <button type="button" className="btn btn-danger" onClick={() => Delete(task.id)}>Delete</button>
                                }
                            </div>
                        </div>
                    ))
                ) : (
                    <p>there is not task</p>
                )}
            </div>
        </div>
    );
};

export default Form;