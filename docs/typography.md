# Typography update — 2026-10-13

Pretendard variable의 사이트 사용 글자 subset을 자체 호스팅한다. 수정된 폰트 내부 이름은 OFL의 Reserved Font Name 조건을 따라 Portfolio Sans로 지정했다. 라이선스는 public/fonts/OFL.txt에 포함한다.

공식 원본: https://github.com/orioncactus/pretendard/blob/main/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2

현재 한글/영문/숫자 글자를 포함하며 나머지는 시스템 글꼴로 표시된다. 새 문구 추가 시 fonttools와 brotli가 설치된 Python 환경에서 `python scripts/subset-font.py /path/to/PretendardVariable.woff2`로 갱신한다. 일반 빌드에는 Python이 필요 없다.

영문 세리프/이탤릭을 제거하고 한글과 영문을 통일했다. 제목 400–500, 워드마크 650; 본문 자간 -0.015em, 제목 -0.035~-0.045em로 지나치게 좁은 간격을 완화했다.

SOMA 캡처는 실제 MAIN TEASER의 약 9.19초 프레임으로 교체했다. 3초/6초/9초를 비교해 가지와 줄기의 윤곽이 상대적으로 분명한 장면을 선택했다. 원본 영상의 부드러운 초점 표현은 보존했으며 합성·샤프닝은 하지 않았다. 1920×1200 JPEG 원본과 800/1440px WebP를 함께 제공한다.
