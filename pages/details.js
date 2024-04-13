import React, { Component } from 'react';
import { Grid, Segment, Header, Image  } from 'semantic-ui-react';
import Layout from '../components/Layout';
import record from '../ethereum/record';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class RecordDetails extends Component {

    static async getInitialProps(props) {
        const addr = props.query.address;
        const accounts = await web3.eth.getAccounts();
        var records, records2, appointment, profilePic;

        try {
            records = await record.methods.searchPatientDemographic(addr).call({from: accounts[0]});
            records2 = await record.methods.searchPatientMedical(addr).call({from: accounts[0]});
            appointment = await record.methods.searchAppointment(addr).call({from: accounts[0]});  

            if(appointment[0].includes("0x00000000000")) appointment[0] = '';

            profilePic = (records[3] == 'Male') ? 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png' : 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png';
            
            return {
                ic: records[0],
                name: records[1],
                phone: records[2],
                gender: records[3],
                dob: records[4],
                height: records[5],
                weight: records[6],
                
                houseaddr: records2[0],
                bloodgroup: records2[1],
                allergies: records2[2],
                medication: records2[3],
                emergencyName: records2[4],
                emergencyContact: records2[5],

                doctoraddr: appointment[0],
                doctorname: appointment[1],
                date: appointment[2],
                time: appointment[3],
                diagnosis: appointment[4],
                prescription: appointment[5],
                description: appointment[6],
                status: appointment[7],
                profilePic
            };
        }
        catch (err) {
            alert("You don't have permission to view this account");
            Router.pushRoute('/list');
        }
    }

    renderDisplay(){
        return (
            <Grid columns={2} stackable className="fill-content">
              <Grid.Row>
                <Grid.Column width={1} />
                <Grid.Column width={5}>
                  <Segment>
                    <Image style={{marginBottom:'25px'}} className="centered" src={this.props.profilePic} size="small" circular />
                    <Segment>
                        <h2 style={{marginBottom:'25px'}}>{this.props.name}</h2>
                        <Grid columns={2}><Grid.Row>
                            <Grid.Column><b style={{color:'grey'}}>IC</b></Grid.Column>
                            <Grid.Column><b>{this.props.ic}</b></Grid.Column>
                        </Grid.Row></Grid>
                        <Grid columns={2}><Grid.Row>
                            <Grid.Column><b style={{color:'grey'}}>Phone</b></Grid.Column>
                            <Grid.Column><b>{this.props.phone}</b></Grid.Column>
                        </Grid.Row></Grid>
                        <Grid columns={2}><Grid.Row>
                            <Grid.Column><b style={{color:'grey'}}>Gender</b></Grid.Column>
                            <Grid.Column><b>{this.props.gender}</b></Grid.Column>
                        </Grid.Row></Grid>
                    </Segment>
                  </Segment>
                  <Segment>
                    <Header as="h3" color='grey' style={{marginBottom:'25px'}}>EMERGENCY CONTACT</Header>
                    <Grid columns={2} verticalAlign='top'>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Name</b>
                                <p style={{fontWeight:'bold'}}>{this.props.emergencyName}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Phone</b>
                                <p style={{fontWeight:'bold'}}>{this.props.emergencyContact}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={9}>
                  <Segment>
                    <Header as="h3" color='grey' style={{marginBottom:'25px'}}>PERSONAL DETAILS</Header>
                    <Grid columns={4} verticalAlign='top'>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Full Name</b>
                                <p style={{fontWeight:'bold'}}>{this.props.name}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Birthdate</b>
                                <p style={{fontWeight:'bold'}}>{this.props.dob}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Height</b>
                                <p style={{fontWeight:'bold'}}>{this.props.height} cm</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Weight</b>
                                <p style={{fontWeight:'bold'}}>{this.props.weight} kg</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Address</b>
                                <p style={{fontWeight:'bold'}}>{this.props.houseaddr}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Header as="h3" color='grey' style={{marginTop:'35px', marginBottom:'25px'}}>MEDICAL DETAILS</Header>
                    <Grid columns={2} verticalAlign='top'>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Blood Group</b>
                                <p style={{fontWeight:'bold'}}>{this.props.bloodgroup}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Allergies</b>
                                <p style={{fontWeight:'bold'}}>{this.props.allergies}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Medications</b>
                                <p style={{fontWeight:'bold'}}>{this.props.medication}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                  </Segment>
                
                  <Segment> 
                    <Header as="h3" color='grey' style={{marginBottom:'25px'}}>APPOINTMENT</Header>
                    <Grid columns={1} verticalAlign='top'>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Doctor Address</b>
                                <p style={{fontWeight:'bold'}}>{this.props.doctoraddr}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={3}>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Doctor Name</b>
                                <p style={{fontWeight:'bold'}}>{this.props.doctorname}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Date</b>
                                <p style={{fontWeight:'bold'}}>{this.props.date}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Time</b>
                                <p style={{fontWeight:'bold'}}>{this.props.time}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Prescription</b>
                                <p style={{fontWeight:'bold'}}>{this.props.prescription}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Description</b>
                                <p style={{fontWeight:'bold'}}>{this.props.description}</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Diagnosis</b>
                                <p style={{fontWeight:'bold'}}>{this.props.diagnosis}</p>
                            </Grid.Column>
                            <Grid.Column>
                                <b style={{color:'grey'}}>Status</b>
                                <p style={{fontWeight:'bold'}}>{this.props.status}</p>
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
                <p style={{fontFamily:'Helvetica'}}>
                    {this.renderDisplay()}
                </p>
            </Layout>
        );
    }
}

export default RecordDetails;