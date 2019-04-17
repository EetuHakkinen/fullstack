import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const CFilter = ({ setFilter }) => {
    const handleChange = (event) => {
        setFilter(event.target.value);
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filter: state.filter
    }
}



const Filter = connect(mapStateToProps, {setFilter})(CFilter)
export default Filter