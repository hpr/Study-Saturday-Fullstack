import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getStudents} from '../store';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudentForm from './NewStudentForm.js';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStudent: false,
      selectedStudent: {},
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.props.getStudents();
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student,
    });
  }
  
  handleClick(e) {
    return this.setState({
      showStudent: !this.state.showStudent,
    });
  }

  render() {
    console.log('this is the state in main', this.state);
    return (
      <div>
        <h1>Students</h1>
        <button onClick={this.handleClick}>Add Student</button>
        {this.state.showStudent ? (
          <NewStudentForm />
        ) : null}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.props.students}
            selectStudent={this.selectStudent}
          />
        </table>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
      </div>
    );
  }
}

const mapState = state => ({
  students: state.students,
});

const mapDispatch = dispatch => ({
  getStudents: () => dispatch(getStudents()),
});

export default connect(mapState, mapDispatch)(Main);
