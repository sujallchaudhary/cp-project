from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)
@app.route('/search_student', methods=['POST'])
def search_student():
    data = request.get_json()
    name = data.get('name')
    year = data.get('year')

    conn = mysql.connector.connect(host="",user="",password="",database="")
    cursor = conn.cursor(dictionary=True)
    if year == "2023":
        query = "SELECT rollNo, email, studentName, fatherName, specialization, Degree, section FROM studentDetails WHERE studentName LIKE %s AND year = '2023'"
    elif year == "2024":
        query = "SELECT rollNo, email, studentName, fatherName, specialization, Degree, section FROM studentDetails WHERE studentName LIKE %s AND year = '2024'"
    elif year == "2022":
        query = "SELECT rollNo, email, studentName, fatherName, specialization, Degree, section FROM studentDetails WHERE studentName LIKE %s AND year = '2022'"
    else:
        return jsonify({"error": "Invalid year"}), 400

    cursor.execute(query, (f"%{name}%",))
    results = cursor.fetchall()
    log_query = "INSERT INTO rollNoSearch (name) VALUES (%s)"
    cursor.execute(log_query, (name,))
    conn.commit()
    cursor.close()
    conn.close()
    if results:
        return jsonify(results)
    else:
        return jsonify({"error": "No data found"}), 404

if __name__ == '__main__':
    app.run(debug=False)
