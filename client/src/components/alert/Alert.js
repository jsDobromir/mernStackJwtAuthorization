import React,{Component, Fragment} from 'react';
import './alert.scss';
import {connect} from 'react-redux';

class Alert extends Component{

    render(){
        return(
            <div className="alert">
                {(this.props.alerts!==null && this.props.alerts.length>0) && (
                    this.props.alerts.map(alert => (
                        <div key={alert.id} className={`alert-${alert.alertType}`}>
                            <p>{alert.msg}</p>
                        </div>
                    ))
                )}
            </div>            
        );
    }

}

function mapStateToProps(state){
    return{
        alerts : state.alerts
    }
}

export default connect(mapStateToProps)(Alert);