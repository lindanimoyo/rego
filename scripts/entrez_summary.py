"""
The file contains functions that perform an entrez

summary retrieval of specified PMIDs from ncbi databases
"""

import json
import logging
import requests
from requests.exceptions import HTTPError
from os.path import exists

"""
Assert that the config file exists and read
from it

"""


assert exists('config.json'), 'Ensure that the config.json file is in the ' \
                              'same directory as this file that reads from ' \
                              'it '

with open('config.json', 'r') as file:
    config = json.loads(file.read())

# set up basic logging configurations to handle std output logs

logging.basicConfig(
    level=logging.INFO,
    filename=config['summaryLog'] if config['silentMode'] else None,
    format=config['logFormat'],
)


def summary():
    """
    The function performs a retrieval of summaries to
    publications specified in already obtained PMIDs

    :return:
    """
    def get_pubmed_id_list(id_file):
        assert exists(id_file), 'The PMIDs file provided does not exist'
        with open(id_file, 'r') as pm:
            pubmed_ids = pm.read()
            return pubmed_ids.replace('\n', ' ')

    def output_to_file(tag, output_file, content):
        """
        A helper function to help with writing content to a file
        :param output_file:
        :param content:
        :param tag:
        :return:
        """

        # Add a tag to a file name for easy identification
        split_file = str(output_file).rsplit('/', maxsplit=1)
        tagged_file = f"{split_file[0]}/{tag}_{split_file[1]}"
        with open(tagged_file, 'w') as out:
            out.write(content)

    try:
        """
        Modify the search parameters to include the PMIDs for
        which we want to retrieve summaries for and then send a 
        request to ncbi
        """
        summary_params = dict(config['searchParams'])
        summary_params["id"] = get_pubmed_id_list('../accessions/pubmed_ids.txt')
        logging.info("Retrieving Summary")
        handles = requests.post(config['baseUrl']['summary'], data=summary_params)

        # write the resulting publication summaries to a file
        output_to_file(config['summaryTag'], config['summaryFile'], handles.text)
        handles.raise_for_status()  # only executed on request failure

    except HTTPError as http_error:
        """
        Raises an http error if the the request fail is associated with 
        a problem with the http protocol
        """
        logging.error(f"HTTP error occurred: {http_error}")

    except Exception as e:
        """
        If the request fails with errors not associated with the http 
        protocol, they shall be raised and caught in this block
        """
        logging.error('A non-http error occurred', e)

    else:
        """
        This block executes only on successful execution of the
        request
        """
        logging.info('Search successful')


if __name__ == '__main__':
    summary()
