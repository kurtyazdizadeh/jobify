import React from 'react';

function Splash(props) {
  return (
    <>
      <div className="splash w-100 d-flex justify-content-center align-items-center position-absolute">
        <div className="splash-content d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-center mb-5">Jobify</h1>
          <img src="./images/logo.png" alt="jobify logo" className="splash-logo mb-5"/>
          <button
            onClick={() => {
              props.history.push('/');
              props.setView('Home');
            }}
            className="btn bg-grey w-25">
              Login
          </button>
        </div>
      </div>
    </>
  );
}

export default Splash;
