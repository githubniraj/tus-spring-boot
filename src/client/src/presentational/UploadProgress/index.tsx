import * as React from 'react';
import { find } from 'lodash';
import PartInProgress from '../PartInProgress';
import { computeProgress } from '../../utils/local-math';

const onMap = progressData => part => {
  const partProgress = progressData[part.partNumber];
  const defaultProgress = { progress: computeProgress((part.loaded ? part.loaded : 0), part.uploadLength - part.uploadOffset), speed: 0 };
  const { progress, speed } = partProgress ? partProgress : defaultProgress;

  return (
    <PartInProgress 
    key={ part.partNumber }
    part={ part }
    progress={ progress }
    speed={ speed }
    />
  );
}

const UploadProgress = ({ parts, progressData }) => {
  const partNodes = parts ? parts.map(onMap(progressData)) : [];

  return (
    <table className='UploadProgress table'>
      <thead>
        <tr>
          <th>Filename</th>
          <th>Progress</th>
          <th>Speed</th>
        </tr>
      </thead>
      <tbody>
        { partNodes }
      </tbody>
    </table>
  )
};

export default UploadProgress;