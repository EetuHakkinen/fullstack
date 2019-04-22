import React, {useState} from 'react';
import Select from 'react-select';

const EditAuthor = (props) => {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        await props.setBirth({
            variables: {name, year}
        })

        setName('');
        setYear('');
    }

    if (!props.show) {
        return null;
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <form onChange={e => submit(e)}>
                name: <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                birthyear: <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <button type="submit">edit</button>
            </form>
        </div>
    );
}

export default EditAuthor;