import pandas as pd

# 엑셀 파일 경로
file_path = 'earPhone.xlsx'

# 엑셀을 판다스 데이터프레임으로 읽기
df = pd.read_excel(file_path)

# 데이터프레임을 JSON 형식으로 변환 (레코드 단위 리스트 형태)
json_result = df.to_json(orient='records', force_ascii=False)

# JSON 결과를 파일로 저장
json_file_path = 'productlist.json'
with open(json_file_path, 'w', encoding='utf-8') as f:
    f.write(json_result)