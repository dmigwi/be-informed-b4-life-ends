from bi.bucketlistapi.tests.basetest import BaseTest


class TestBestCase(BaseTest):

    def test_homepage_return(self):
        '''Test retreiving the homePage'''
        respons = self.client.get('/api/v1/')
        self.assertIn(('https://github.com/andela-dmigwi/be-informed'
                       '-b4-life-ends.git'),
                      respons.data.get('Copyright', ''))
        self.assertEqual(200, respons.status_code)

    def test_route_auth_register_code(self):
        '''Test registering of a new User is successful'''
        register = {'username': 'Migwi', 'password': '1234'}
        response = self.client.post('/api/v1/auth/register',
                                    format='json',
                                    data=register)
        self.assertEqual(201, response.status_code)
        self.assertEqual(dict(Message='Registration Successful'),
                         response.data)

    def test_login_with_correct_credentials(self):
        '''Test if a token is returned after a successful login'''
        login_credential = {'username': 'andela-dmigwi',
                            'password': '1234'}
        response = self.client.post('/api/v1/auth/login',
                                    format='json',
                                    data=login_credential)
        self.assertIsNotNone(response.data.get('token'))
        self.assertEqual(200, response.status_code)

    def test_get_a_list_of_bucketlists(self):
        '''Test retrieving a list of bucketlists'''
        response = self.client.get('/api/v1/bucketlists')
        self.assertEqual(200, response.status_code)
        self.assertGreater(len(response.data), 1)

    def test_create_a_list_of_bucketlists(self):
        '''Test Creation of a new BucketList'''
        bucketlist_new = {"name": "Bucketlist2"}
        response = self.client.post('/api/v1/bucketlists',
                                    format='json',
                                    data=bucketlist_new)
        self.assertEqual(201, response.status_code)
        self.assertIsNotNone(response.data)

    def test_get_bucketlist_with_id(self):
        '''Test retrieving a bucketlist with a given Id'''
        response = self.client.get('/api/v1/bucketlists/1')
        self.assertEqual(200, response.status_code)
        self.assertEqual(len(response.data), 6)

    def test_edit_bucketlist_with_id(self):
        '''Test editting a bucketlist with a given Id'''
        bucketlist = {"name": "Visit Canadian Rockies"}
        response = self.client.put('/api/v1/bucketlists/1',
                                   format='json',
                                   data=bucketlist)
        self.assertEqual(200, response.status_code)
        self.assertEqual('Visit Canadian Rockies',
                         response.data.get('name'))

    def test_delete_bucketlist_with_id(self):
        '''Test Deleting a Bucketlist with a given Id'''
        response = self.client.delete('/api/v1/bucketlists/1')
        self.assertEqual(204, response.status_code)

    def test_create_task_in_bucketlist_with_id(self):
        '''Test creating a task in BucketList with the given Id'''
        task = {"name": "Visit Andela New York Office"}
        response = self.client.post('/api/v1/bucketlists/1/items',
                                    format='json',
                                    data=task)
        self.assertEqual(201, response.status_code)
        self.assertEqual(task['name'], response.data.get('name'))

    def test_modify_task_in_bucketlist_with_id(self):
        '''Test Modifying a task in a Bucketlist with a  given Id'''
        task_new = {"name": "Visit Andela Nigeria Office",
                    "done": True
                    }
        response = self.client.put('/api/v1/bucketlists/1/items/2',
                                   format='json',
                                   data=task_new)
        self.assertEqual(200, response.status_code)
        self.assertTrue(response.data.get('done'))

    def test_delete_task_in_bucketlist_with_id(self):
        '''Test Deleting a task in a BucketList with the given Id'''
        response = self.client.delete('/api/v1/bucketlists/1/items/3')
        self.assertEqual(204, response.status_code)
