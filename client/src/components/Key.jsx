import React from 'react';
const Key = props => {
  return (
    <table id="key">
    <tbody>
      <tr>
      <td className='keyIcon' style={{backgroundColor: '#1B4D3E'}}>&nbsp;</td>
      <td className='keyDescriptions'>1000+ cases</td>
      </tr>
      <tr>
      <td className='keyIcon' style={{backgroundColor: '#00693E'}}>&nbsp;</td>
      <td className='keyDescriptions'>100-999 cases;</td>
      </tr>
      <tr>
      <td className='keyIcon' style={{backgroundColor: '#018749'}}>&nbsp;</td>
      <td className='keyDescriptions'> 1-99 cases</td>
      </tr>
      <tr>
      <td className='keyIcon' style={{backgroundColor: '#3CB371'}}>&nbsp;</td>
      <td className='keyDescriptions'>0 cases</td>
      </tr>
    </tbody>
  </table>
  )
}

export default Key;