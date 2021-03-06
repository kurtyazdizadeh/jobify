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
      <div className='d-flex flex-column align-items-center scroll my-5 pb-3'>
        {
          this.props.goals.map((goal, index) => {
            return (
              <GoalItems
                key = {goal.user_goal_id}
                id = {goal.user_goal_id}
                title = {goal.goal_title}
                isAchieved = {goal.goal_achieved}
                isActive = {goal.currently_active}
                isStripe = {index % 2 === 0}
                current = {goal.current_progress}
                end = {goal.end_goal}
                plusGoal = {this.props.plusGoal}
                minusGoal = {this.props.minusGoal}
              />
            );
          })
        }
        <Link to="/goals/add">
          <i onClick={() => this.props.setView('Add Goal')} className='fas fa-plus pointer my-3'></i>
        </Link>
      </div>
    );
  }
}

export default Goals;
