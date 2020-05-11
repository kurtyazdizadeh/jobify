import React from 'react';
import GoalItems from './goals-item';

class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: []
    };
  }

  render() {
    return (
      <div className='d-flex flex-column align-items-center scroll'>
        <h1 className='mt-5'>Goals</h1>
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
        <i onClick={() => this.props.setView('Add Goal', {})} className='fas fa-plus pointer mt-3'></i>
      </div>
    );
  }
}

export default Goals;
