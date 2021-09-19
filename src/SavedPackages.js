import React from 'react';

// state management
import { connect } from 'react-redux';
import { getSavedPackages } from './savedPackagesSlice';
//assets
import hero_2 from './assets/hero_2.df8d6580.png';


export class SavedPackages extends React.Component {
  

  getSavedPackagesTextContent({ savedPackages }) {
    return savedPackages.name;
  }
  getSavedPackagesLoop() {
    const { savedPackages } = this.props;
    return savedPackages;
  }

  render() {
    
    return (
      <React.Fragment>
        {this.getSavedPackagesLoop().map((savedPackages, index) => (
          <div key={savedPackages.id}>{this.getSavedPackagesTextContent({ savedPackages })}</div>
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    savedPackages: getSavedPackages(state, props)
  };
}

export default connect(
  mapStateToProps
)(SavedPackages);