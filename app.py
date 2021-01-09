from flask import Flask, render_template, jsonify
import pandas as pd
import csv
import psycopg2 as psycopg2

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    return render_template("base.html")

@app.route("/scatter")
def scatter():
    return render_template("Salary.html")

@app.route("/bubble")
def bubble():
    return render_template("bubble.html")

@app.route("/bullet")
def bullet():
    return render_template("bullet.html")

@app.route("/merged_data")
def read_merged_sql():
    conn = psycopg2.connect(dbname="project-2", user="postgres", password="postgres!", host="127.0.0.1", port="5432")

    dataframe = pd.read_sql("SELECT * FROM merged_data", conn)

    json_data = dataframe.to_json(orient="records")

    return json_data

@app.route("/tuition_vs_salary")
def read_salary_sql():
    conn = psycopg2.connect(dbname="project-2", user="postgres", password="postgres", host="127.0.0.1", port="5432")

    dataframe = pd.read_sql("SELECT * FROM tuition_vs_salary", conn)

    json_data = dataframe.to_json(orient="records")

    return json_data

if __name__ == '__main__':
    app.run(debug=True)