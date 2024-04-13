import React, { Component } from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class DoctorDetails extends Component {

    static async getInitialProps(props) {
        const addr = props.query.address;
        const accounts = await web3.eth.getAccounts();
        var doctor, profilePic;

        try {
            doctor = await record.methods.searchDoctor(addr).call({from: accounts[0]});
            profilePic = (doctor[3] == 'Male') ? 'https://cdn-icons-png.flaticon.com/128/387/387561.png' : 'https://cdn-icons-png.flaticon.com/128/387/387569.png';
            
            return {
                ic: doctor[0],
                name: doctor[1],
                phone: doctor[2],
                gender: doctor[3],
                dob: doctor[4],
                qualification: doctor[5],
                major: doctor[6],
                profilePic,
            };
        }
        catch (err) {
            alert("You have not created an account");
            Router.pushRoute('/list');
        }
    }

    renderDisplayNew(){
        return (
            <Grid columns={2} stackable className="fill-content">
              <Grid.Row>
                <Grid.Column width={1} />
                <Grid.Column width={14}>
                <Segment>
                    <Image style={{marginBottom:'25px'}} className="centered" src={this.props.profilePic} size="small" circular />
                    <Segment>
                        <h2 style={{textAlign:'center'}}>{this.props.name}</h2>
                    </Segment>
                  </Segment>
                  <Segment>
                    <Header as="h3" color='grey' style={{marginBottom:'25px'}}>PERSONAL DETAILS</Header>
                    <Grid columns={3} verticalAlign='top'>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Full Name</b>
                                <p>{this.props.name}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>IC</b>
                                <p>{this.props.ic}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Gender</b>
                                <p>{this.props.gender}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid columns={2} verticalAlign='top'>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Phone</b>
                                <p>{this.props.phone}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Birthdate</b>
                                <p>{this.props.dob}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Header as="h3" color='grey' style={{marginTop:'35px', marginBottom:'25px'}}>EDUCATION DETAILS</Header>
                    <Grid columns={2} verticalAlign='top'>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Highest Qualification</b>
                                <p>{this.props.qualification}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Major</b>
                                <p>{this.props.major}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={1} />
              </Grid.Row>
            </Grid>
          );
    }

    render() {
        return (
            <Layout>
                <p>
                    {this.renderDisplayNew()}
                </p>
            </Layout>
        );
    }
}

export default DoctorDetails;