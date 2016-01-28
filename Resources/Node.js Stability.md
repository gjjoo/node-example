# Node.js Stability

API에 나타나는 Stability는 API의 안정도를 의미한다. 새로운 기능이 추가되면서 도입된 API는 충분한 테스트가 부족할 수도 있다. 시간이 지나면서 많은 Node.js 커뮤니티의 검증을 통해서 새로 추가된 기능을 안정화되는 단계로 전환된다. API문서에는 이러한 성숙도를 Stability로 알려준다.

Stability에는 다음과 같은 단계가 있으며 단계가 높을수록 안정적이다.

단계 | 설명
---- | ----
<span style="color:red">0 - Deprecated</span>       | 기능에 문제가 있어서 사용하지 않을 것을 권장함
<span style="color:orange">1 - Experimental</span>  | 시험용 기능으로 사라질 수도 있음
<span style="color:green">2 - Stable</span>         | API가 안정화된 상태
<span style="color:blue">3 - Locked</span>          | 보안, 성능 또는 버그수정만 허용될 뿐 심각한 문제가 발생하지 않는 이상, 변화없이 사용