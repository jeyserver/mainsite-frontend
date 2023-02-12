import * as React from 'react';

interface IProps {
  backups: number[];
}

class BackupsCell extends React.Component<IProps> {
  render() {
    return (
      <React.Fragment>
        {this.props.backups.length === 0 ? (
          <i className="fa fa-times fa-lg" />
        ) : (
          <>
            <div>
              {this.props.backups[2] ? (
                <i
                  className="far fa-check-square"
                  style={{ color: '#5cb85c' }}
                ></i>
              ) : (
                <i className="fa fa-times fa-lg" />
              )}{' '}
              روزانه
            </div>
            <div>
              {this.props.backups[1] ? (
                <i
                  className="far fa-check-square"
                  style={{ color: '#5cb85c' }}
                ></i>
              ) : (
                <i className="fa fa-times fa-lg" />
              )}{' '}
              ماهانه
            </div>
            <div>
              {this.props.backups[0] ? (
                <i
                  className="far fa-check-square"
                  style={{ color: '#5cb85c' }}
                ></i>
              ) : (
                <i className="fa fa-times fa-lg" />
              )}{' '}
              سالیانه
            </div>
          </>
        )}
      </React.Fragment>
    );
  }
}

export default BackupsCell;
