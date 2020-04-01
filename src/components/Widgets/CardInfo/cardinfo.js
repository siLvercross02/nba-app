import React from 'react';
import './cardinfo.css';

const CardInfo = (props) => {

    const teamName = (teams,team) => {
        let data = teams.find((item)=>{
            return item.id === team
        })
        if(data) {
            return data.name
        }
    }   

    return(
        <div className="cardInfo">
            <span className="teamName">
                {teamName(props.teams, props.team)}
            </span>
            <span className="date">
                <i className="far fa-clock"></i>
                {props.date}
            </span>
        </div>
    )
}

export default CardInfo;