// get date to day
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

let newDate = new Date();
let date = newDate.getDate();
let month = newDate.getMonth();
let yy = newDate.getFullYear();

let year = (yy < 1000) ? yy + 1900 : yy;
let now = `${date} ${months[month]} ${year}`;
let join = now.toString();

module.exports.joined = join;