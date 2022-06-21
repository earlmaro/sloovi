import React from 'react';
import PropTypes from 'prop-types';
import TimePicker from 'react-time-picker';

ListTask.propTypes = {
    task: PropTypes.object,
    handleEdit: PropTypes.func
};

export default function ListTask({ task, handleEdit }) {
    return (
        <React.Fragment >
            {/* {taskList.map((task) => ( */}
                {/* <div> */}
            <div class="col-4">
                <img src="http://www.gravatar.com/avatar/cf94b74bd41b466bb185bd4d674f032b?default=https%3A%2F%2Fs3.sloovi.com%2Favatar-default-icon.png" style={{ width: "50px" }} alt="icon" />
                    </div>
                    <div class="col-4">
                <div class="row">{task?.task_msg}</div>
                <div class="row">{task?.task_date}</div>
                    </div>
                    <div class="col-4">
                        <button onClick={() => handleEdit(task?.id)} class="btn mr-2"><i class="bi bi-pencil-fill"></i></button>
                        <button class="btn"><i class="bi bi-bell-fill"></i></button>
                        <button class="btn"><i class="bi bi-check-lg"></i></button>

                    </div>
                {/* </div> */}
            {/* ))} */}
        </React.Fragment >


    );
}
