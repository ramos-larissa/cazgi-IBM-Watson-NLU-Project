import React from 'react';
import './bootstrap.min.css';

function EmotionTableRow(props) {
  let emotion = props.emotions.result.keywords[0].emotion;
   return (
     <tbody>
       <tr key={1}><td>Sadness</td><td>{emotion.sadness}</td></tr>
       <tr key={2}><td>Joy</td><td>{emotion.joy}</td></tr>
       <tr key={3}><td>Fear</td><td>{emotion.fear}</td></tr>
       <tr key={4}><td>Disgust</td><td>{emotion.disgust}</td></tr>
       <tr key={5}><td>Anger</td><td>{emotion.anger}</td></tr>
     </tbody>
   );
}
class EmotionTable extends React.Component {
      //Returns the emotions as an HTML table
      render() {
        let emotions = this.props.emotions;
        console.log(emotions);
        console.log(emotions.result.keywords[0].emotion.sadness);
        return (
          <div className="d-flex justify-content-center">
            <table className="table table-bordered">
              <tbody>
                    <EmotionTableRow emotions={emotions} />
              </tbody>
            </table>
          </div>
        );
        }
    
}
export default EmotionTable;