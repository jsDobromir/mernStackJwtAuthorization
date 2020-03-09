import React,{Component, Fragment} from 'react';
import './activateAccount.scss';
import * as api from '../../utils/api';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../redux/alerts/alertActions';

class ActivateAccount extends Component {

    constructor(){
        super();
        this.state = {
            error : null
        };
    }

    async componentDidMount(){
        const {match : {params}} = this.props;
        const token = params.token;
        try{
            const {data} = await api.accountActivation({token});
            this.props.setAlert(data.message,'success');
            this.redirectSuccess = setTimeout(() => {
                this.props.history.push("/signin");
            },6000);
        }catch(error){
            console.log('ERROR',error.response.data.message);
            this.setState({error : error.response.data.message});
        }
    }

    componentWillUnmount(){
        if(this.redirectSuccess){
            clearTimeout(this.redirectSuccess);
        }

    }

    render(){
        return(
            <div className="actAccount">
                {this.state.error!==null && (
                    <div className="alert-danger">
                        <p>{this.state.error}</p>
                        <p>Go back to <Link to="/">Home Page</Link></p>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state){

    return state;
}

function mapPropsToState(dispatch){
    return{
        setAlert : (msg,alertType) => {dispatch(setAlert(msg,alertType))}
    }
}

export default connect(mapStateToProps,mapPropsToState)(ActivateAccount);