import React from 'react';
import GoalItems from './goals-item';
import { Link } from 'react-router-dom';

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: []
    };
  }

  componentDidMount() {
    this.props.setView('Goals');
  }

  render() {
    return (
      <div className='d-flex flex-column align-items-center scroll my-5 pt-3'>
        {
          this.props.goals.map(goal => {
            return (
              <GoalItems
                key={goal.user_goal_id}
                title = {goal.goal_title}
                isAchieved = {goal.goal_achieved}
                isActive = {goal.currently_active}
                current = {goal.current_progress}
                end = {goal.end_goal}
              />
            );
          })
        }
        <Link to="/goals/add">
          <i onClick={() => this.props.setView('Add Goal')} className='fas fa-plus pointer mt-3'></i>
        </Link>
      </div>
    );
  }
}

export default Goals;
