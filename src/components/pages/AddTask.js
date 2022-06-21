import React, { useEffect, useState } from 'react';
import { SelectionState } from 'draft-js';
import PropTypes from 'prop-types';
import TimePicker from 'react-time-picker';
import { convertHMS } from '../../utils/convertTime';

AddTask.propTypes = {
    onAddTask: PropTypes.func,
    changeTitle: PropTypes.func,
    changeDate: PropTypes.func,
    changeTime: PropTypes.func,
    assignedOwner: PropTypes.func,
    onUpTask: PropTypes.func,
    assignedUsersList: PropTypes.array,
    isEdit: PropTypes.bool,
    currentTask: PropTypes.object,
    handleCancel: PropTypes.func,
    handleDelete: PropTypes.func,
    taskOwner: PropTypes.string
};

export default function AddTask({ onAddTask,
    changeTime,
    changeDate,
    changeTitle,
    assignedOwner,
    assignedUsersList,
    isEdit,
    currentTask,
    onUpTask,
    handleCancel,
    handleDelete,
    taskOwner
}) {
    const [title, setTitle] = useState();
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [owner, setOwner] = useState();
    const [toggle, setToggle] = useState(false);

    if (isEdit && currentTask && toggle) {
        setToggle(false);
        console.log(currentTask);
        setTitle(currentTask.task_msg);
        setTime(convertHMS(currentTask.task_time));
        setDate(currentTask.task_date);
        setOwner(currentTask.user_id);
    }
    
    const test = async (event) => {
        setOwner(null);
        assignedOwner(event)
    }

    useEffect(() => {
        setToggle(true);
    }, []);
    return (
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Task Description</label>
                <input type="text" onChange={changeTitle} defaultValue={title} class="form-control" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <div class="row">
                    <div class="col">
                        <label for="exampleInputPassword1" class="form-label">Date</label>
                        <input type="date" defaultValue={date} onChange={changeDate} class="form-control" />
                    </div>
                    <div class="col">
                        <label for="exampleInputPassword1" class="form-label mt-1">Time</label>
                        <TimePicker disableClock={true} value={time} onChange={changeTime} />
                    </div>
                </div>

            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Assign User</label>
                <select name="duration" defaultValue={owner || taskOwner } onChange={test} className="selectpicker  form-control" required>
                    <option value="" />
                    {assignedUsersList.map((option) => (
                        <option key={option.company_id} defaultValue={owner} value={option.user_id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            <div class="row">
                <div class="col-4">
                    {isEdit && (
                      <button type="button" onClick={() => handleDelete(currentTask?.id)} class="btn btn-primary"><i class="bi bi-trash3"></i></button>
                    )}
                </div>

                <div class="col-8">
                    {!isEdit ?
                        <button type="button" onClick={handleCancel} class="btn btn-primary mr-2">Cancel</button>
                        :
                        <button type="button" onClick={handleCancel} class="btn btn-primary mr-2">Cancel </button>
                    }
                    {!isEdit ?
                        <button type="button" onClick={onAddTask} class="btn btn-primary">Submit</button>
                        :
                        <button type="button" onClick={() => onUpTask(currentTask?.id)} class="btn btn-primary">Update</button>
                    }
                </div>
            </div>
        </form>
    );
}
