from datetime import timedelta

import pendulum
from airflow.decorators import dag, task
from pendulum import DateTime


@dag(
    start_date=pendulum.datetime(2024, 1, 1, tz="UTC"),
    schedule=timedelta(days=1),
    catchup=False,
    tags=["amazon"],
)
def amazon_products_etl():
    @task()
    def scrape_products():
        """Scrapes product listings from Amazon.

        Returns a list of raw html files that were dumped to storage
        """
        return ['xxxx.html']

    @task()
    def parse_products(html_files: list[str]):
        """Parses product listings from HTML into JSON

        Returns a list of paths to jsonl files containing parsed
        product information
        """
        return ['xxxx.jsonl']


    @task()
    def load_products(json_files):
        """Load product listings from JSON files into the warehouse

        product information is loaded to a dimensional table
        product pricing is loaded to a fact table
        """
        return pendulum.DateTime.today()

    @task()
    def summarise_products(start_date):
        """Calculate daily aggregate product statistics for a given day

        """
        pass

    summarise_products(
        load_products(
            parse_products(
                scrape_products()
            )
        )
    )

amazon_products_etl()
