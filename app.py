from flask import Flask, render_template
import csv

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

# @app.route("/scatterplot")
# def bubble():
#     return "Here goes the scatter plot!"

# @app.route("/bubblechart")
# def bubble():
#     return "Here goes the bubble chart!"


# @app.route("/")
# def welcome():
#     """List all available api routes."""
#     return (
#         f"Available Routes:<br/>"
#         f"/api/v1.0/names<br/>"
#         f"/api/v1.0/passengers"
#     )




if __name__ == '__main__':
    app.run(debug=True)