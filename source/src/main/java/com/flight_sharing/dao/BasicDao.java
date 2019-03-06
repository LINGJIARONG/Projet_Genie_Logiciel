package com.flight_sharing.dao;

import java.net.InetAddress;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.transport.client.PreBuiltTransportClient;

public abstract class BasicDao implements Dao {
	/* index of tables */
	public static String index;
	/* address of the server */
	private static String serverAddr;
	/* setting elastic properties */
	static {
		try {
			Properties elasticProperties = new Properties();
			elasticProperties.load(BasicDao.class.getResourceAsStream("elastic.properties"));
			serverAddr = elasticProperties.getProperty("addr");
			index = elasticProperties.getProperty("index");
			if (index == null || index.length() == 0) {
				index = "default";
			}
		} catch (Exception e) {
			registerException(e);
		}
	}

	@SuppressWarnings({ "resource" })
	public TransportClient getClient() {
		TransportClient client = null;
		try {
			if (serverAddr == null) {
				serverAddr = "localhost";
			}
			// on startup
			client = new PreBuiltTransportClient(Settings.EMPTY)
					.addTransportAddress(new InetSocketTransportAddress(InetAddress.getByName(serverAddr), 9300));

		} catch (Exception e) {
			registerException(e);
		}
		return client;
	}

	private static void registerException(Exception e) {
		Logger.getLogger(BasicDao.class.getName()).log(Level.SEVERE, null, e);
	}
}