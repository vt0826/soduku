const _startTime = new WeakMap();
const _endTime = new WeakMap();
const _running = new WeakMap();
const _duration = new WeakMap();
const _timeCalulation = new WeakMap();

class Timer {
  constructor() {
    _startTime.set(this, 0);
    _endTime.set(this, 0);
    _running.set(this, false);
    _duration.set(this, 0);

    _timeCalulation.set(this, function(duration) {
      const hours = Math.floor(
        (duration % (1000 * 60 * 60)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((duration % (1000 * 60)) / 1000);
      const time = { hours, minutes, seconds };
      return time;
    });
  }

  start() {
    if (_running.get(this)) throw new error("timer already started");
    _running.set(this, true);
    _startTime.set(this, new Date());
  }

  stop() {
    if (!_running.get(this)) throw new error("timer hasnt started yet");

    _endTime.set(this, new Date());
    _running.set(this, false);

    const endTime = _endTime.get(this);
    const startTime = _startTime.get(this);

    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    _duration.set(this, seconds);
    const duration = timeNow - startTime;

    return _timeCalulation.get(this)(duration);
  }

  get duration() {
    if (!_running.get(this)) throw new error("timer hasnt started yet");

    const timeNow = new Date();
    const startTime = _startTime.get(this);
    const duration = timeNow - startTime;

    return _timeCalulation.get(this)(duration);
  }
}
