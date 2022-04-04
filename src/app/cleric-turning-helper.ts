export class ClericTurningHelper {
  static getSavingThrows(level: number) {
    return ClericTurningHelper.TURNING_EVENTS[level];
  }

  static TURNING_EVENTS = [
    {skeleton: '', zombie: '', ghoul: '', wight: '', wraith: '', mummy: '', spectre: '', vampire: ''}, //0
    {skeleton: '7', zombie: '9', ghoul: '11', wight: '', wraith: '', mummy: '', spectre: '', vampire: ''}, //1
    {skeleton: 'T 2d6', zombie: '7', ghoul: '9', wight: '11', wraith: '', mummy: '', spectre: '', vampire: ''}, //2
    {skeleton: 'T 2d6', zombie: 'T 2d6', ghoul: '7', wight: '9', wraith: '11', mummy: '', spectre: '', vampire: ''}, //3
    {
      skeleton: 'D 2d6',
      zombie: 'T 2d6',
      ghoul: 'T 2d6',
      wight: '7',
      wraith: '9',
      mummy: '11',
      spectre: '',
      vampire: ''
    }, //4
    {
      skeleton: 'D 2d6',
      zombie: 'D 2d6',
      ghoul: 'T 2d6',
      wight: 'T 2d6',
      wraith: '7',
      mummy: '9',
      spectre: '11',
      vampire: ''
    }, //5
    {
      skeleton: 'D 2d6',
      zombie: 'D 2d6',
      ghoul: 'D 2d6',
      wight: 'T 2d6',
      wraith: 'T 2d6',
      mummy: '7',
      spectre: '9',
      vampire: '11'
    }, //6
    {
      skeleton: 'D 2d6',
      zombie: 'D 2d6',
      ghoul: 'D 2d6',
      wight: 'D 2d6',
      wraith: 'T 2d6',
      mummy: 'T 2d6',
      spectre: '7',
      vampire: '9'
    }, //7 2d6
    {
      skeleton: 'D 3d6',
      zombie: 'D 2d6',
      ghoul: 'D 2d6',
      wight: 'D 2d6',
      wraith: 'D 2d6',
      mummy: 'T 2d6',
      spectre: 'T 2d6',
      vampire: '7'
    }, //8
    {
      skeleton: 'D 3d6',
      zombie: 'D 3d6',
      ghoul: 'D 2d6',
      wight: 'D 2d6',
      wraith: 'D 2d6',
      mummy: 'D 2d6',
      spectre: 'T 2d6',
      vampire: 'T 2d6'
    }, //9
    {
      skeleton: 'D 3d6',
      zombie: 'D 3d6',
      ghoul: 'D 3d6',
      wight: 'D 2d6',
      wraith: 'D 2d6',
      mummy: 'D 2d6',
      spectre: 'D 2d6',
      vampire: 'T 2d6'
    }, //10
    {
      skeleton: 'D 3d6',
      zombie: 'D 3d6',
      ghoul: 'D 3d6',
      wight: 'D 3d6',
      wraith: 'D 2d6',
      mummy: 'D 2d6',
      spectre: 'D 2d6',
      vampire: 'D 2d6'
    }, //11
    {
      skeleton: 'D 3d6',
      zombie: 'D 3d6',
      ghoul: 'D 3d6',
      wight: 'D 3d6',
      wraith: 'D 3d6',
      mummy: 'D 2d6',
      spectre: 'D 2d6',
      vampire: 'D 2d6'
    }, //12
    {
      skeleton: 'D 3d6',
      zombie: 'D 3d6',
      ghoul: 'D 3d6',
      wight: 'D 3d6',
      wraith: 'D 3d6',
      mummy: 'D 3d6',
      spectre: 'D 2d6',
      vampire: 'D 2d6'
    }, //13
    {
      skeleton: 'D 4d6',
      zombie: 'D 3d6',
      ghoul: 'D 3d6',
      wight: 'D 3d6',
      wraith: 'D 3d6',
      mummy: 'D 3d6',
      spectre: 'D 3d6',
      vampire: 'D 2d6'
    }, //14
    {
      skeleton: 'D 4d6',
      zombie: 'D 4d6',
      ghoul: 'D 3d6',
      wight: 'D 3d6',
      wraith: 'D 3d6',
      mummy: 'D 3d6',
      spectre: 'D 3d6',
      vampire: 'D 3d6'
    }, //15
    {
      skeleton: 'D 4d6',
      zombie: 'D 4d6',
      ghoul: 'D 4d6',
      wight: 'D 3d6',
      wraith: 'D 3d6',
      mummy: 'D 3d6',
      spectre: 'D 3d6',
      vampire: 'D 3d6'
    }, //16
    {
      skeleton: 'D 4d6',
      zombie: 'D 4d6',
      ghoul: 'D 4d6',
      wight: 'D 4d6',
      wraith: 'D 3d6',
      mummy: 'D 3d6',
      spectre: 'D 3d6',
      vampire: 'D 3d6'
    }, //17
    {
      skeleton: 'D 4d6',
      zombie: 'D 4d6',
      ghoul: 'D 4d6',
      wight: 'D 4d6',
      wraith: 'D 4d6',
      mummy: 'D 3d6',
      spectre: 'D 3d6',
      vampire: 'D 3d6'
    }, //18
    {
      skeleton: 'D 4d6',
      zombie: 'D 4d6',
      ghoul: 'D 4d6',
      wight: 'D 4d6',
      wraith: 'D 4d6',
      mummy: 'D 4d6',
      spectre: 'D 3d6',
      vampire: 'D 3d6'
    }, //19
    {
      skeleton: 'D 4d6',
      zombie: 'D 4d6',
      ghoul: 'D 4d6',
      wight: 'D 4d6',
      wraith: 'D 4d6',
      mummy: 'D 4d6',
      spectre: 'D 3d6',
      vampire: 'D 3d6'
    }, //20
  ]
}
