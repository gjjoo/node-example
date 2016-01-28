/**
 * ---------------------------------------------
 * URL (https://nodejs.org/api/url.html)
 * ---------------------------------------------
 */
// 모듈 추출
var url = require('url');

// 모듈 사용
// URL 문자열을 URL 객체로 변환하여 리턴합니다.
var parsedObject = url.parse('http://www.hanb.co.kr/trackback/978-89-7914-874-9');
console.log('- parsedObject:', parsedObject);

// URL 객체를 URL 문자열로 변환하여 리턴합니다.
var objectFormat = url.format(parsedObject);
console.log('- objectFormat:', objectFormat);

// 매개 변수를 조합하여 완전한 URL 문자열을 생성해 리턴합니다.
var urlResolve = url.resolve('http://geunjae.joo/', 'profile');
console.log('- urlResolve:', urlResolve);