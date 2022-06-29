import React, { Component } from 'react'



class Bukalapak extends Component {

    state = {
        selectedItems : null,
        form : {
            name : null,
            price : 0
        }
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    onChangeInput = e => {
        e.preventDefault();
        if(e.target.id == 'name') {
            this.setState({
                form : {
                     
                    
                    price : 0
                }
            })
        }
    }



    render() {
        return (
            <div className="containerCSS">
                
                <div className="wrapperCSS">
                    <div className="ts1">hey</div>
                    <div className="ts2">hey2</div>
                    <div className="ts3">hey3</div>

                    
                </div>
                <br />

                <div className="wrapperCSSFlex">

                    <div className="flex1">hey</div>
                    <div className="flex2">hey2</div>
                    <div className="flex3">hey3</div>

                </div>


            </div>
        )
    }
}

export default Bukalapak;